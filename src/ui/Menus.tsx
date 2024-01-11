import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

import { Tables } from '../../database.types.ts';
import useOutsideClick from '../hooks/useOutsideClick.ts';

const MENU_MARGIN = 8;
const FALLBACK_RECT = {
  width: 0,
  x: 0,
  y: 0,
  height: 0,
};

interface IStyledList {
  position: {
    x: number;
    y: number;
  } | null;
}

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<IStyledList>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props?.position?.x}px;
  top: ${(props) => props?.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

type MenuId = Tables<'cabins'>['id'] | null;

type MenuPosition = IStyledList['position'] | null;

interface IMenusProps {
  children: ReactNode;
}

interface IMenuChildProps {
  id: MenuId;
}

interface IMenusContext {
  openId: MenuId;
  close: () => void;
  open: Dispatch<SetStateAction<number | null>>;
  setPosition: Dispatch<SetStateAction<{ x: number; y: number } | null>>;
  position: MenuPosition;
}

interface IListProps extends IMenusProps, IMenuChildProps {}

interface IButtonProps extends IMenusProps {
  icon: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}

const MenusContext = createContext<IMenusContext>({} as IMenusContext);

function Menus({ children }: IMenusProps) {
  const [openId, setOpenId] = useState<number | null>(null);
  const [position, setPosition] = useState<MenuPosition>(null);

  const close = () => setOpenId(null);
  const open = setOpenId;

  const menusContextValue = useMemo(
    () => ({
      openId,
      close,
      open,
      position,
      setPosition,
    }),
    [open, openId, position],
  );

  return (
    <MenusContext.Provider value={menusContextValue}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }: IMenuChildProps) {
  const { openId, open, close, setPosition } = useContext(MenusContext);

  const handleClick = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();

      const target = e.target as HTMLElement;
      const rect =
        target.closest('button')?.getBoundingClientRect() ?? FALLBACK_RECT;

      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + MENU_MARGIN,
      });

      const noMenuOpen = openId === null;
      const clickOnDifferentMenu = openId !== id;

      if (noMenuOpen || clickOnDifferentMenu) {
        open(id);
      } else {
        close();
      }
    },
    [close, id, open, openId, setPosition],
  );

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function List({ id, children }: IListProps) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>(close, false);

  const clickOnDifferentMenu = openId !== id;

  if (clickOnDifferentMenu) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Button({ children, icon, onClick, disabled }: IButtonProps) {
  const { close } = useContext(MenusContext);

  const handleClick = useCallback(() => {
    onClick?.();
    close();
  }, [close, onClick]);

  return (
    <li>
      <StyledButton disabled={disabled} onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

Button.defaultProps = {
  onClick: null,
  disabled: false,
};

export default Menus;
