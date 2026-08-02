import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTranslationsData } from '../../services/dataLoader';
import styles from './Translations.module.css';

const Translations = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchTranslationsData();

            // ترتيب الألعاب من الأحدث للأقدم بناءً على حقل تاريخ الإضافة
            const sortedData = data.sort((a, b) => {
                return new Date(b.addedDate) - new Date(a.addedDate);
            });

            setGames(sortedData);
            setLoading(false);
        };

        loadData();
    }, []);

    if (loading) {
        return <div className={styles.pageContainer}><h2 style={{ textAlign: 'center' }}>جاري التحميل...</h2></div>;
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.pageTitle}>معرض التعريبات</h1>

            <div className={styles.gridContainer}>
                {games.map((game) => (
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
        </div>
    );
};

export default Translations;