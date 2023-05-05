import { Component } from "solid-js"
import { Combatant } from "../../types/Combatant";
import { Box, Container, Typography } from "@suid/material";

const CombatantView: Component<{ combatant: Combatant }> = (props) => {
    return (
        <Container sx={{ fontWeight: 'bold', minWidth: '8rem', width: '13rem', margin: "0 0 0 0 !important", padding: "0 0 0 1%  !important" }} >
            <Box class="ticker" paddingLeft={"0.65rem"} flexDirection="row" justifyContent="space-between">
                <Typography text-shadow=" 0 0 8px #000" whiteSpace="nowrap" overflow="hidden" textOverflow="clip" maxWidth={"9rem"} class={"icon class-" + props.combatant.Job.toLowerCase()}>
                    {props.combatant.name}
                </Typography>
                <Typography marginLeft={0.75}>
                    {props.combatant.ENCDPS}
                </Typography>
            </Box>
            <Box zIndex={-1} top="0" position="fixed" minWidth={'136px'} maxWidth={'198px'} width={'12%'} height={'1.5rem'} class={"cell-class-" + props.combatant.Job.toLowerCase()} sx={{ transform: "skew(-30deg)", opacity: '0.6' }} />
            <Box zIndex={-1} top="0" position="fixed" minWidth={'68px'} maxWidth={'99px'} width={'6%'} height={'1.5rem'} class={"cell-class-" + props.combatant.Job.toLowerCase()} sx={{ transform: "skew(-30deg)", opacity: '0.8' }} />
        </Container >
    )
}

export default CombatantView;