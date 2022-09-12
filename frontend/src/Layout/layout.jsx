import './components.css'
import Navigation from '../components/Navigation'
import useUser from '../hooks/useUser'

export default function Layout(props){
    const user = useUser()

    const accountLink = user.data ? '/userAccount' : '/login'

    return (
        <div className="Layout">
            <Navigation/>
            <main>{props.children}</main>
        </div>
    )
}