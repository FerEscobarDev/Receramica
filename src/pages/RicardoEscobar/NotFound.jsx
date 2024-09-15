import { Link } from 'react-router-dom';

export const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>404 - Página No Encontrada</h1>
            <p style={styles.paragraph}>Lo sentimos, la página que estás buscando en receramica.com no existe.</p>
            <Link to="/" style={styles.link}>Volver a la página principal</Link>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        fontSize: '48px',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '18px',
        marginBottom: '30px',
    },
    link: {
        fontSize: '20px',
        color: '#007BFF',
        textDecoration: 'none',
    }
};