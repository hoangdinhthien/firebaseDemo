import React from 'react';
import { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Container } from "@mui/material";
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

export default function Players () {
    const [APIData, setAPIData] = useState( [] );
    // const baseUrl=`https://635a851b38725a1746c8a79a.mockapi.io/Players`
    const baseUrl = `https://6336fad05327df4c43cd921b.mockapi.io/PE_FER201m`;
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
    const truncate = ( input, length ) =>
        input?.length > length ? `${input.substring( 0, length )}...` : input;
    return (
        <div className='player_info'>
            <Box
                sx={{ width: '90%' }}
                className='Boxx'
            >
                <Grid container rowSpacing={{ xs: 2, md: 3 }} columnSpacing={{ xs: 4, sm: 8, md: 10 }}>
                    {APIData.map( ( data ) => (
                        <Grid item xs={2} sm={4} md={4}>
                            <div className='card'>
                                <img src={data.img} />
                                <div className="product-details">
                                    <h5>{truncate( data.title, 20 )}</h5>
                                    <p style={{ fontSize: '15px' }}>{truncate( data.description, 30 )}</p>
                                    <Link to={`detail/${data.id}`}>
                                        <p className='players_button'><button>Detail</button></p>
                                    </Link>
                                </div>
                            </div>
                        </Grid>
                    ) )}
                </Grid>
            </Box>
        </div>
    );

}