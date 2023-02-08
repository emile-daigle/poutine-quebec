import React, { Children } from "react";
import BurgerMenu from './burgeMenu';

function Header() {
  return (
  <div>
    <header>
        <div className="barreHoriz">
            <div className="Logo">
              <img src="/img/PoutineLogo.png" alt="poutLogo" id="poutLogo"/>
            </div>
            <div className="burgerNAV">
              <BurgerMenu />
            </div>
            <div className="col-1"></div>
            <div className="barreNav">
                <button className="bout" id="accueilB">Accueil</button>
                <button className="bout" id="carteB">Carte des restaurants</button>
                <button className="bout" id="listeB">Liste des restaurants</button>
                <button className="bout" id="aProposB">À propos</button>
            </div>
            <div className="col-2"></div>
            <div className="barreSigning">
                <button className="boutC">Connexion</button>
                <button className="inscripBout">Inscription</button>
            </div>
        </div>
    </header>
  </div>
  );
}

export default Header;
