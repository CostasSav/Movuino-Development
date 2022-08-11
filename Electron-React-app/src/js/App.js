import React from 'react'
import { VSequencer } from './VSequencer'

export default function App() {
    return (
        <div>
            <div className="container mt-4">
                <div>
                    <br></br>
                    <button className='btn btn-primary' onClick={() => {
                        electron.notificationApi.sendNotification('XXX')
                    }}>Notify</button>
                </div>
            </div>
        </div>
    )
}