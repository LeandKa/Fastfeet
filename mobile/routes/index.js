import { useSelector } from 'react-redux';
import BottomNavigator from './BottomNavigator';

export default function Route() {
    const { signed } = useSelector(state => state.users);
    return BottomNavigator(signed);
}
