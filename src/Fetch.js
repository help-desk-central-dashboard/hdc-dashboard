import React, { useEffect, useState } from 'react';
import {Message, useToaster} from "rsuite";

const Fetch = ()=> {
    const [agentData, setAgentData] = useState([]);
    const [queueData, setQueueData] = useState([]);
    const [bomgarData, setBomgarData] = useState([]);

    const toaster = useToaster();
    const message = (
        <Message showIcon type={'info'} closable>
            Service now data not available.
        </Message>
    );
    useEffect(() => {
        // Function to fetch data from the server
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/data');  // Replace with the appropriate URL
                const data = await response.json();



                setAgentData(data.agent_data);
                setQueueData(data.queue_data);
                setBomgarData(data.bomgar_data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);

    }, []);

    return { agentData, queueData, bomgarData };

}


export default Fetch