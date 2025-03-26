import React from 'react';
import { createRoot } from 'react-dom/client';
import TrueFocus from './TrueFocus';
import SpotlightCard from './SpotlightCard';
import MetaBalls from './MetaBalls';

import './js/faq.js'
import './js/FileList.js'
import './js/forms_buttons.js'
import './js/OpenMenu.js'
import './js/Track_buttons.js'

import './style.css'

import VKlogo from './vk_logo.svg';
import IDigitlogo from './idigit_logo4partners.png';
import Internetlogo from './internet.svg';
import KemSUlogo from './KemSU_logo.png';


const container_TrueFocus = document.getElementById('TrueFocus');
const TrueFocus_root = createRoot(container_TrueFocus);

TrueFocus_root.render(
    <TrueFocus

        manualMode={false}
        blurAmount={4}
        borderColor="#00A3EA"
        animationDuration={2}
        pauseBetweenAnimations={0.1}
    />
);

const container_cardID = document.getElementById('CardID');
const cardID = createRoot(container_cardID);

cardID.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 92, 255, 0.6)">
        <img className="ID_logo_partner" src={IDigitlogo} alt="id logo"/>
        <div className="IDCard_title card_title">Институт цифры</div>
        <div className="IDCard_text card_text">
            созданный в 2020 году на площадке Кемеровского
            государственного университета Институт цифры
            сегодня является лидером по вопросам цифровизации Кузбасса
        </div>
        <div className="hrefs">
            <a className="vk_link" href="https://vk.com/digital_kemsu"><img className="vk_link_img" src={VKlogo} /></a>
        </div>
    </SpotlightCard>
);

const container_cardKemSU = document.getElementById('CardKemSU');
const cardKemSU = createRoot(container_cardKemSU);

cardKemSU.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(80, 87, 225, 0.6)">
        <img className="KemSU_logo_partner" src={KemSUlogo} alt="KemSU logo"/>
        <div className="KemSUCard_title card_title">Кемеровский государственный университет</div>
        <div className="KemSUCard_text card_text">
            опорный ВУЗ Кузбасса, основанный в 1953 году<br/>
            <br/>
            включён в рейтинг лучших вузов развивающихся стран Европы и Средней Азии QS EECA — 2021<br/>
            <br/>
            по версии Европейской Научно-промышленной палаты (ARES), вуз попал в топ-100 университетов России
        </div>
        <div className="hrefs">
            <a className="internet_link" href="https://kemsu.ru"><img className="internet_link_img" src={Internetlogo}></img></a>
            <a className="vk_link" href="https://vk.com/kemsu"><img className="vk_link_img" src={VKlogo}></img></a>
        </div>
    </SpotlightCard>
);

const container_cardCS = document.getElementById('CardETC');
const cardCS = createRoot(container_cardCS);

cardCS.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
        coming soon
    </SpotlightCard>
);



const container_MetaBalls = document.getElementById('MetaBalls');
const MetaBalls_root = createRoot(container_MetaBalls);

MetaBalls_root.render(
    <MetaBalls
        color="#2E2E2E"
        cursorBallColor="#2E2E2E"
        cursorBallSize={2}
        ballCount={25}
        animationSize={30}
        enableMouseInteraction={false}
        enableTransparency={false}
        hoverSmoothness={0.05}
        clumpFactor={1.4}
        speed={0.34}
/>
);
