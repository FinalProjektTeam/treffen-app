import './components.css'
import Navigation from '../components/Navigation'
import useUser from '../hooks/useUser'

export default function Layout(props){
    const user = useUser()

       return (
        <div className="Layout">
            <Navigation/>
            <main>{props.children}</main>
            <footer>
          <div>test footer</div>
        </footer>
        </div>
    )
}