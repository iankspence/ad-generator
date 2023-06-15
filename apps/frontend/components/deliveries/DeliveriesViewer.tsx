import React, { useEffect, useState } from 'react';
import { Grid, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RenderLibraryCards from '../library/library-card/RenderLibraryCards';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

const cards = ['hook', 'claim', 'review', 'close'];

export default function DeliveriesViewer({ ads, singleCanvasView, toggleCanvasView }) {
    const [currentCards, setCurrentCards] = useState({});

    useEffect(() => {
        if (!singleCanvasView) {
            // Reset all cards to the first one when switch to four canvas view
            const newCurrentCards = {};
            for (const ad of ads) {
                newCurrentCards[ad.id] = 0;
            }
            setCurrentCards(newCurrentCards);
        }
    }, [singleCanvasView, ads]);

    const handlePrevious = (id) => {
        setCurrentCards({...currentCards, [id]: currentCards[id] - 1});
    };

    const handleNext = (id) => {
        setCurrentCards({...currentCards, [id]: currentCards[id] + 1});
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h6">Deliveries</Typography>
                    {ads.map((ad) => (
                        <Accordion key={ad.id}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Delivered</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{ padding: "16px" }}>
                                    {RenderLibraryCards(ad, singleCanvasView ? 2 : 8, toggleCanvasView)}
                                </div>
                                {singleCanvasView && (
                                    <div className="flex fixed inset-x-0 bottom-8 z-10 justify-center">
                                        <div className="space-x-4">
                                            <Button
                                                onClick={() => handlePrevious(ad.id)}
                                                disabled={currentCards[ad.id] <= 0}
                                            >
                                                <ArrowBackOutlinedIcon />
                                            </Button>
                                            <Button
                                                onClick={() => handleNext(ad.id)}
                                                disabled={currentCards[ad.id] >= cards.length - 1}
                                            >
                                                <ArrowForwardOutlinedIcon />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>
            </Grid>
        </div>
    );
}
