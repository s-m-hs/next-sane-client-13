import React from 'react'
import "./LoadingA.css"
import DotLoader from 'react-spinners/DotLoader'

export default function LoadingA({ isShow }) {
    return (

        <>
            {isShow &&
                <div className='LoadingA'>
                    <div>

                        <DotLoader color="var(--themA)" loading size={150} speedMultiplier={1} />
                    </div>
                </div>}
        </>

    )
}
