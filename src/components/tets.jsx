import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactSpeedometer from 'react-d3-speedometer';
import DraggableSquare from './DraggableSquare';
const GaugeChart = ({ label, value, minValue, maxValue, unit }) => {
    return (
        <div style={{ textAlign: 'center', border: '10px solid #ccc', padding: '10px', position: 'relative' }}>
            <h2 style={{ fontSize: '1.5 em', fontWeight: 'bold', marginTop: '0px' }}>{label}</h2>
            <ReactSpeedometer
                value={value}
                minValue={minValue}
                maxValue={maxValue}
                needleColor="red"
                startColor="green"
                segments={10}
                endColor="red"
                needleHeightRatio={1}
                label={label}
                width={400} // Điều chỉnh kích thước của biểu đồ
                height={300}
            />
            <div style={{ position: 'absolute', bottom: '0px', left: '50%', transform: 'translateX(-50%)', fontSize: '1.5em', color: 'red', fontWeight: 'bold', marginBottom: '20px' }}>
                <span>{value}</span> <span>{unit}</span>
            </div>
        </div>
    );
};

const App = () => {
    const [gaugesData, setGaugesData] = useState({
        taytrai: 0,
        cangtaytrai: 0,
        tayphai: 0,
        cangtayphai: 0,
        nhiptim: 0,
        spo2: 0,
        lucnamcv: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000); // Thực hiện fetch data mỗi giây

        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/data-byptt/endpoint/GETGAUSE');
            const data = response.data;

            setGaugesData({
                taytrai: data[0]?.public?.output?.jsonData?.taytrai_p || 0,
                cangtaytrai: data[0]?.public?.output?.jsonData?.cangtaytrai_p || 0,
                tayphai: data[0]?.public?.output?.jsonData?.tayphai_p || 0,
                cangtayphai: data[0]?.public?.output?.jsonData?.cangtayphai_p || 0,
                nhiptim: data[0]?.public?.output?.jsonData?.nhiptim || 0,
                spo2: data[0]?.public?.output?.jsonData?.spo2 || 0,
                lucnamcv: data[0]?.public?.output?.jsonData?.lucnamcv || 0,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className="enlarged-form">
                <DraggableSquare />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div>
                    <GaugeChart
                        label="TAY TRÁI"
                        value={gaugesData.taytrai}
                        minValue={-3.14}
                        maxValue={3.14}
                        unit="RAD"
                    />
                </div>
                <div>
                    <GaugeChart
                        label="CẲNG TAY TRÁI"
                        value={gaugesData.cangtaytrai}
                        minValue={-3.14}
                        maxValue={3.14}
                        unit="RAD"
                    />
                </div>
                <div>
                    <GaugeChart
                        label="TAY PHẢI"
                        value={gaugesData.tayphai}
                        minValue={-3.14}
                        maxValue={3.14}
                        unit="RAD"
                    />
                </div>
                <div>
                    <GaugeChart
                        label="CẲNG TAY PHẢI"
                        value={gaugesData.cangtayphai}
                        minValue={-3.14}
                        maxValue={3.14}
                        unit="RAD"
                    />
                </div>
                <div>
                    <GaugeChart
                        label="NHỊP TIM"
                        value={gaugesData.nhiptim}
                        minValue={0}
                        maxValue={150}
                        unit="BPM"
                    />
                </div>
                <div>
                    <GaugeChart
                        label="TỈ LỆ OXI TRONG MÁU"
                        value={gaugesData.spo2}
                        minValue={0}
                        maxValue={100}
                        unit="%"
                    />
                </div>
                <div>
                    <GaugeChart
                        label="LỰC NẮM TAY"
                        value={gaugesData.lucnamcv}
                        minValue={0}
                        maxValue={10000}
                        unit="Hgram"
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
