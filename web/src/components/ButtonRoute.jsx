import '../styles/index.scss';
import { Link } from 'react-router-dom';

const ButtonRoute = ({ text, route }) => {
    return (
        <Link className="routeBtn" to={route}>
            {text}
        </Link>
    );
};

export default ButtonRoute;