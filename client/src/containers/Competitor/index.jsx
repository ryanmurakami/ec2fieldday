import React, { useState, useEffect } from 'react';
import 'grd';
import styles from './index.scss';

import checkAPIRoute from '../../helper.js';

import Image from '../../component/Image/index.jsx';
import Divider from '../../component/Divider/index.jsx';

function CompetitorContainer() {
    const [response, setResponse] = useState({"message": "Oops, something went wrong..."})

    const url = 'competitors';
    useEffect(() =>{
        checkAPIRoute(url, setResponse)
    }, []);

    const competitors = response.body || [];
    const renderCompetitors = competitors.map(function(competitor, index){
        return (
            <div key={index} className="Cell -3of12">
                <Image
                    link={`/competitors/${competitor.id}`}
                    image={competitor.image}
                    subtitle={competitor.name}/>
            </div>
        );
    });


    return (
        <div className={styles['container']}>
            <Divider text="Competitors" />
            <div className="Grid -middle">
                {renderCompetitors}
            </div>
        </div>
    );
}

export default CompetitorContainer;