import "./perfil.css";

export default function Perfil() {
  return (
    <>
      <div className="profile-container">
        <h2>Perfil do Usuário</h2>

        <div className="profile-field">
          <label for="nome" class="profile-label">
            Nome:
          </label>
          <input
            type="text"
            id="nome"
            class="profile-input"
            placeholder="Digite seu nome"
          />
        </div>

        <div class="profile-field">
          <label for="email" class="profile-label">
            E-mail:
          </label>
          <input
            type="email"
            id="email"
            class="profile-input"
            placeholder="Digite seu e-mail"
          />
        </div>
        <button onclick="salvarPerfil()">Editar perfil</button>
      </div>
    </>
  );
}
