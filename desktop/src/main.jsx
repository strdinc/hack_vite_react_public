import React from 'react';
import { createRoot } from 'react-dom/client';
import MetaBalls from './components/MetaBalls';
import SpotlightCard from './components/SpotlightCard';
import CircularText from './components/CircularText';

import './scripts/GradientButtons.js';
import './scripts/Track_buttons.js';
import './scripts/faq.js';
import './scripts/forms_buttons.js';
import './scripts/FileList.js';
import './scripts/menuButton.js';

import './style.css';
import './screen_21_9.css';

import VKlogo from './vk_logo.svg';
import IDigitlogo from './idigit_logo4partners.svg';
import Internetlogo from './internet.svg';
import KemSUlogo from './KemSU_logo.svg';

const container_metaballs = document.getElementById('metaballs-root');
const metaballs = createRoot(container_metaballs);

metaballs.render(
    <MetaBalls
        color="#181719"
        cursorBallColor="#181719"
        cursorBallSize={2}
        ballCount={25}
        animationSize={30}
        enableMouseInteraction={false}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1.3}
        speed={0.7}
    />
);

const container_cardID = document.getElementById('cardID');
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

const container_CircularText = document.getElementById('CircularText');
const partnerCircularText = createRoot(container_CircularText);

partnerCircularText.render(
    <CircularText
        text="hackademic<>hackademic<>"
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
    />
);

const container_cardKemSU = document.getElementById('cardKemSU');
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

const container_cardCS = document.getElementById('cardCS');
const cardCS = createRoot(container_cardCS);

cardCS.render(
    <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
        coming soon
    </SpotlightCard>
);

const container_balatro = document.getElementById('balatro');
const balatroBACK = createRoot(container_balatro);
import Balatro from './components/Balatro.jsx';

balatroBACK.render(
    <Balatro
    isRotate={false}
    mouseInteraction={false}
    pixelFilter={700}
    />
);
