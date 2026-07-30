import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTranslationsData } from '../../services/dataLoader';
import styles from './GameDetails.module.css';

const GameDetails = () => {
    const { folderName } = useParams();
    const [game, setGame] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadGameDetails = async () => {
            const allGames = await fetchTranslationsData();
            const foundGame = allGames.find(g => g.folderName === folderName);
            setGame(foundGame);
            setLoading(false);
        };

        loadGameDetails();
    }, [folderName]);

    if (loading) {
        return <div className={styles.detailsContainer}><h2 style={{ textAlign: 'center' }}>جاري التحميل...</h2></div>;
    }

    if (!game) {
        return (
            <div className={styles.detailsContainer} style={{ textAlign: 'center' }}>
                <h2>عذراً، لم يتم العثور على هذه اللعبة!</h2>
                <Link to="/translations" className={styles.backLink}>العودة للمعرض</Link>
            </div>
        );
    }

    return (
        <div className={styles.detailsContainer}>
            <Link to="/translations" className={styles.backLink}>&rarr; العودة لجميع التعريبات</Link>

            <div className={styles.headerSection}>
                <div className={styles.posterWrapper}>
                    <img src={game.coverImage} alt={game.title} className={styles.posterImage} />
                </div>

                <div className={styles.infoWrapper}>
                    <h1 className={styles.gameTitle}>{game.title}</h1>
                    <p className={styles.description}>{game.description}</p>

                    <div className={styles.techTags}>
                        {game.technologies.map((tech, index) => (
                            <span key={index} className={styles.tag}>{tech}</span>
                        ))}
                    </div>

                    <a href={game.downloadUrl} download className={styles.downloadButton}>
                        تحميل التعريب
                    </a>
                </div>
            </div>

            {game.screenshots && game.screenshots.length > 0 && (
                <div className={styles.gallerySection}>
                    <h2>صور من التعريب</h2>
                    <div className={styles.screenshotsGrid}>
                        {game.screenshots.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`صورة ${index + 1} من تعريب ${game.title}`}
                                className={styles.screenshot}
                                loading="lazy"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GameDetails;