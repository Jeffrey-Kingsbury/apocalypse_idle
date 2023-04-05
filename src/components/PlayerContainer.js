import styled from 'styled-components';
import { useContext } from 'react';
import { userContext } from '../UserContext';
import EquipmentImage from './EquipmentImage';
const PlayerContainer = () => {
	const { player, CALCULATE_EQUPIMENT_BONUS, ITEM_GENERATOR } = useContext(userContext);
	const twohanded = player.equipped.weapon && ITEM_GENERATOR[player.equipped.weapon].twoHand;

	return (
		<Wrapper>
			<StatsContainer>
				<p>Att: {CALCULATE_EQUPIMENT_BONUS(player).attack || 0}</p>
				<p>Def: {CALCULATE_EQUPIMENT_BONUS(player).defence || 0}</p>
				<p>Str: {CALCULATE_EQUPIMENT_BONUS(player).strength || 0}</p>
				<p>Gun: {CALCULATE_EQUPIMENT_BONUS(player).guns || 0}</p>
				<p>Weight: {CALCULATE_EQUPIMENT_BONUS(player).weight || 0}</p>
			</StatsContainer>

			<Equipment_container>
				<Equipment_row>
					<Equipment_item>
						{player.equipped.cloak && <EquipmentImage slot={'cloak'} item={player.equipped.cloak} />}
						{!player.equipped.cloak && (
							<EquipmentImage slot={'cloak'} item={'cloak'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item>
						{player.equipped.head && <EquipmentImage slot={'head'} item={player.equipped.head} />}
						{!player.equipped.head && (
							<EquipmentImage slot={'head'} item={'head'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item>
						{player.equipped.neck && <EquipmentImage slot={'neck'} item={player.equipped.neck} />}
						{!player.equipped.neck && (
							<EquipmentImage slot={'neck'} item={'neck'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
				</Equipment_row>
				<Equipment_row>
					<Equipment_item>
						{player.equipped.weapon && <EquipmentImage slot={'weapon'} item={player.equipped.weapon} />}
						{!player.equipped.weapon && (
							<EquipmentImage slot={'weapon'} item={'weapon'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item>
						{player.equipped.chest && <EquipmentImage slot={'chest'} item={player.equipped.chest} />}
						{!player.equipped.chest && (
							<EquipmentImage slot={'chest'} item={'chest'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item>
						{player.equipped.weapon && twohanded && (
							<EquipmentImage slot={'shield'} transparent={true} item={player.equipped.weapon} />
						)}
						{player.equipped.weapon && !twohanded && player.equipped.shield && (
							<EquipmentImage slot={'shield'} item={player.equipped.shield} />
						)}
						{!player.equipped.shield && !twohanded && (
							<EquipmentImage slot={'shield'} item={'shield'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
				</Equipment_row>
				<Equipment_row>
					<Equipment_item>
						{player.equipped.hands && <EquipmentImage slot={'hands'} item={player.equipped.hands} />}
						{!player.equipped.hands && (
							<EquipmentImage slot={'hands'} item={'hands'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item>
						{player.equipped.legs && <EquipmentImage slot={'legs'} item={player.equipped.legs} />}
						{!player.equipped.legs && (
							<EquipmentImage slot={'legs'} item={'legs'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item style={{ visibility: 'hidden' }}></Equipment_item>
				</Equipment_row>
				<Equipment_row>
					<Equipment_item>
						{player.equipped.ring1 && <EquipmentImage slot={'ring1'} item={player.equipped.ring1} />}
						{!player.equipped.ring1 && (
							<EquipmentImage slot={'ring1'} item={'ring'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item>
						{player.equipped.feet && <EquipmentImage slot={'feet'} item={player.equipped.feet} />}
						{!player.equipped.feet && (
							<EquipmentImage slot={'feet'} item={'feet'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
					<Equipment_item>
						{player.equipped.ring2 && <EquipmentImage slot={'ring2'} item={player.equipped.ring2} />}
						{!player.equipped.ring2 && (
							<EquipmentImage slot={'ring2'} item={'ring'} placeholder={true} transparent={true} />
						)}
					</Equipment_item>
				</Equipment_row>
			</Equipment_container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	width: 450px;
	height: 600px;
	border: 2px solid black;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
	background-color: #fff;
`;

const StatsContainer = styled.div`
	width: 100%;
	height: 20%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 2px solid black;
	border-radius: 10px;
	box-shadow: 0 5px 7px 0 rgba(0, 0, 0, 0.5);
	position: relative;
`;

const Equipment_container = styled.div`
width: 100%
height: 100%
display: flex;
flex-direction: column;
justify-content: center;
`;

const Equipment_row = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 115px;
`;

const Equipment_item = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100px;
	height: 100px;
	border: 2px solid black;
`;

export default PlayerContainer;
