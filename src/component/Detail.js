import React from 'react';
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Container, Icon, Row } from 'react-materialize';
import ModalCase from './ModalCase';
import { TableContainer } from '@mui/material';

export default function Detail () {
    const [isOpen, setIsOpen] = useState( false );
    const [APIData, setAPIData] = useState( [] );
    const { id } = useParams();
    const baseUrl = `https://6336fad05327df4c43cd921b.mockapi.io/PE_FER201m?id=${id}`;
    useEffect( () => {
        fetch( baseUrl )
            .then( response => {
                if ( response.ok ) { return response; }
                else {
                    var error = new Error( 'Error ' + response.status + ': ' + response.statusText ); error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error( error.message ); throw errmess;
                } )
            .then( response => response.json() )
            .then( data => setAPIData( data ) )
            .catch( error => console.log( error.message ) );
    }, [] );
    // let cost = player.cost.toLocaleString();
    return (
        <div className='container2'>
            {APIData.slice( 0, 1 ).map( ( data ) => (
                <div className='product-card'>
                    <h2 className='detail_name'>{data.title}</h2>
                    <h4 className='detail_name'>{data.description}</h4>
                    <h3 className='detail_club'>Views: {data.views}</h3>
                    <div className='product-tumb'>
                        <img src={data.img} />
                        {/* <div className='youtubeIcon'>
                            <a onClick={() => setIsOpen( true )} className="btn-floating halfway-fab waves-effect waves-light red">
                                <Icon>ondemand_video</Icon>
                            </a>
                        </div> */}
                    </div>
                    {isOpen && <ModalCase setIsOpen={setIsOpen} data={data} />}
                    <div className='product-details'>
                        {/* <h4>Nation: {data.nation}</h4> */}
                        {/* <div className='product-price'>Cost: $ {data.cost.toLocaleString()} </div> */}
                        <p className='detali_Info'>{data.content}</p>
                        <p>Attractive: {data.actractive}</p>
                    </div>
                </div>
            ) )}
        </div>
    );
}