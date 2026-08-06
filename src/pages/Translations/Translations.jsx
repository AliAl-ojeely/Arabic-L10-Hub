import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTranslationsData } from '../../services/dataLoader';
import styles from './Translations.module.css';

const Translations = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(''); // حالة تخزين نص البحث

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchTranslationsData();

            const sortedData = data.sort((a, b) => {
                return new Date(b.addedDate) - new Date(a.addedDate);
            });

            setGames(sortedData);
            setLoading(false);
        };

        loadData();
    }, []);

    // تصفية الألعاب بناءً على نص البحث (غير حساس لحالة الأحرف)
    const filteredGames = games.filter((game) =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <div className={styles.pageContainer}><h2 style={{ textAlign: 'center' }}>جاري التحميل...</h2></div>;
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerSection}>
                <h1 className={styles.pageTitle}>معرض التعريبات</h1>
                <span className={styles.counterBadge}>
                    إجمالي الألعاب: {games.length}
                </span>
            </div>

            {/* --- شريط البحث --- */}
            <div className={styles.searchContainer}>
                <div className={styles.searchInputWrapper}>
                    {/* أيقونة البحث */}
                    <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="ابحث عن اسم اللعبة..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* --- التحقق من وجود نتائج للبحث --- */}
            {filteredGames.length > 0 ? (
                <div className={styles.gridContainer}>
                    {filteredGames.map((game) => (
                        <Link to={`/translations/${game.folderName}`} key={game.id} className={styles.gameCard}>

                            <div className={styles.posterContainer}>
                                <img
                                    src={game.coverImage}
                                    alt={`بوستر لعبة ${game.title}`}
                                    className={styles.posterImage}
                                    loading="lazy"
                                />
                            </div>

                            <div className={styles.gameInfo}>
                                <h3 className={styles.gameTitle}>{game.title}</h3>
                            </div>

                        </Link>
                    ))}
                </div>
            ) : (
                <div className={styles.noResults}>
                    <p>عذراً، لم يتم العثور على ألعاب مطابقة لبحثك "{searchQuery}"</p>
                </div>
            )}
        </div>
    );
};

export default Translations;