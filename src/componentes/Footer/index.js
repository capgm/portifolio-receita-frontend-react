
import './footer.css'

export default function Footer(){
    return (
        <footer>
        <div className="footer-container">
            <div className="footer-info">
                <h3>Contato</h3>
                <p>Email: contato@receitas.com</p>
                <p>Telefone: (XX) XXXX-XXXX</p>
            </div>
            <div className="footer-social">
                <h3>Redes Sociais</h3>
                <a href="#" target="_blank">Facebook</a>
                <a href="#" target="_blank">Instagram</a>
                <a href="#" target="_blank">Pinterest</a>
            </div>
        </div>
    </footer>
    )
}