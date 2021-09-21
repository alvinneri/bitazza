import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { InstrumentsApi } from '../../api/instruments';

import InstrumentsTable from './Instrument';

const Main = () => {

    const { instruments } = useSelector(state => state.instruments)

    return (
        <div>
        {instruments.length > 0 ? 
            <div style={{paddingTop: '5em'}}><InstrumentsTable /></div> : null

        }
        </div>
    )

}

export default Main