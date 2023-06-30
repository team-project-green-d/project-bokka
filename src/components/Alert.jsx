import React from 'react'
import mainStyle from '../css/sass.module.scss';


export default function Alert({children}) {
    return (
        <div className={`${mainStyle['alert-wrap']}`}>
            <div role="alert" className={`${mainStyle['alert']}`}
            >
                <div>
                    {children}
                </div>
                <div
                    onClick={() => setAlertID(false)}
                ><GrClose /></div>
            </div>
        </div>
    )
}
