import { useEffect, useState, useContext } from 'react';
import { userContext } from '../UserContext';
import styled from 'styled-components';
import head from '../img/placeholders/head.png';
import cloak from '../img/placeholders/cloak.png';
import neck from '../img/placeholders/neck.png';
import weapon from '../img/placeholders/weapon.png';
import shield from '../img/placeholders/shield.png';
import chest from '../img/placeholders/chest.png';
import hands from '../img/placeholders/hands.png';
import legs from '../img/placeholders/legs.png';
import feet from '../img/placeholders/feet.png';
import ring from '../img/placeholders/ring.png';

const EquipmentImage = ({ item, transparent = false, placeholder = false, slot = false }) => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [image, setImage] = useState(null);
    const { UNEQUIP_ITEM, player, setPlayer } = useContext(userContext);
	const transparency = transparent ? 0.25 : 1;

	useEffect(() => {
		if (!placeholder) {
			const fetchImage = async () => {
				try {
					const response = await import(`../img/equipment/${item}.png`);
					setImage(response.default);
				} catch (err) {
					setError(err);
				} finally {
					setLoading(false);
				}
			};

			fetchImage();
		}

		if (placeholder) {
			switch (item) {
				case 'head':
					setImage(head);
					break;
				case 'cloak':
					setImage(cloak);
					break;
				case 'neck':
					setImage(neck);
					break;
				case 'weapon':
					setImage(weapon);
					break;
				case 'shield':
					setImage(shield);
					break;
				case 'chest':
					setImage(chest);
					break;
				case 'hands':
					setImage(hands);
					break;
				case 'legs':
					setImage(legs);
					break;
				case 'feet':
					setImage(feet);
					break;
				case 'ring':
					setImage(ring);
					break;
			}
		}
	}, [item]);

	const clickHandler = () => {
		if (placeholder || transparency < 1) {
            return;
        }
        UNEQUIP_ITEM(slot, player, setPlayer);
    };

	return (
		<Img
			draggable="false"
			onClick={() => {
				clickHandler();
			}}
			style={{ opacity: transparency, cursor: placeholder ? 'default' : transparency === 1 ? 'pointer' : 'default' }}
			src={image}
			alt={item}
		/>
	);
};

const Img = styled.img`
	width: 70%;
`;
export default EquipmentImage;
