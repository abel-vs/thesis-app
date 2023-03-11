const { useState } = require("react");
import Popup from 'reactjs-popup';
import { Card } from 'flowbite-react';


function InfoLink({ text, info }) {

    const [open, setOpen] = useState(false);

    return (
        <div>
            <a
                className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
                onClick={() => setOpen(true)}
            >
                {text}
            </a>
            <Popup modal nested open={open} closeOnDocumentClick onClose={() => setOpen(false)}>
                <Card className='w-96'>
                    {info}
                </Card>
            </Popup>
        </div>);
}

export default InfoLink;