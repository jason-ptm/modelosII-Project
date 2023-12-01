import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Groups2Icon from '@mui/icons-material/Groups2'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/material/styles'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { redirectRoute, resetStudent } from '../../redux/slice/studentReducer'
import paths, { studentPath } from '../../utils/constants/paths'

interface ISideBarProps {
  open: boolean
  toggleDrawer: () => void
  role: 'admin' | 'student'
}

const drawerWidth: number = 240

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const SideBar: FC<ISideBarProps> = ({ open, toggleDrawer, role }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const handleClick = (url: string, isCreated: boolean) => {
    dispatch(
      redirectRoute({
        url,
        state: {
          isCreated: isCreated,
        },
      })
    )
  }

  const handleLogOut = () => {
    if (role === 'student') {
      dispatch(resetStudent())
    } else {
      dispatch(
        redirectRoute({
          url: paths.STUDENT_FORM.absolutePath,
          state: {
            isCreated: false,
          },
        })
      )
    }
  }

  const mainStudentListItems = (
    <>
      <ListItemButton
        onClick={() => handleClick(`${studentPath}/${params.id}/home`, false)}
      >
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      <ListItemButton
        onClick={() => handleClick(`${studentPath}/${params.id}/team`, false)}
      >
        <ListItemIcon>
          <Groups2Icon />
        </ListItemIcon>
        <ListItemText primary="Equipo" />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          handleClick(`${studentPath}/${params.id}/competitions`, false)
        }
      >
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="Competiciones" />
      </ListItemButton>
    </>
  )

  const mainAdminListItems = (
    <>
      <ListItemButton
        onClick={() => handleClick(`admin/${params.adminId}/teams`, false)}
      >
        <ListItemIcon>
          <Groups2Icon />
        </ListItemIcon>
        <ListItemText primary="Equipos" />
      </ListItemButton>
      <ListItemButton
        onClick={() =>
          handleClick(`admin/${params.adminId}/competitions`, false)
        }
      >
        <ListItemIcon>
          <EmojiEventsIcon />
        </ListItemIcon>
        <ListItemText primary="Competiciones" />
      </ListItemButton>
    </>
  )

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {role === 'student' ? mainStudentListItems : mainAdminListItems}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleLogOut}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Salir" />
        </ListItemButton>
      </List>
    </Drawer>
  )
}

export default SideBar
