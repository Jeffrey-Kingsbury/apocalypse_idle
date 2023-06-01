import styled from "styled-components";
import { useContext } from "react";
import { userContext } from "../UserContext";

const Inventory = () => {
    const {player, setPlayer} = useContext(userContext)
    return(<Wrapper>
        {Object.entries(player.inventory).map(e => {
            console.log(e)
            return e[1] > 0 ?  e[0] : null;
        })}
    </Wrapper>)

}

const Wrapper = styled.div`
	width: 450px;
	height: 600px;
	border: 2px solid black;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
    text-transform: capitalize;
`;

export default Inventory;
