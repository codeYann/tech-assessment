import {
	MenuContainer,
	MenuNav,
	MenuSearchContainer,
	UserIcon,
	StyledLink,
} from "./Menu.styles";
import { FaUser } from "react-icons/fa";

interface MenuProps {
	linkName: string;
	path: string;
}

export function Menu({ linkName, path }: MenuProps) {
	return (
		<MenuContainer>
			<MenuNav>
				<p>Gestão de Tarefas</p>
			</MenuNav>

			<MenuSearchContainer>
				<StyledLink to={path}>{linkName}</StyledLink>
			</MenuSearchContainer>

			<UserIcon role="img" aria-label="user-icon">
				<FaUser />
			</UserIcon>
		</MenuContainer>
	);
}
