import Balance from './pages/Balance/Balance'
import CreateGroup from './pages/CreateGroup/CreateGroup'
import EditGroup from './pages/EditGroup/EditGroup'
import GroupPage from './pages/Group/Group'
import Home from './pages/Home/Home'
import { type DefaultParams, type RouteComponentProps } from 'wouter'

interface Routes {
  path: string
  component: React.ComponentType<RouteComponentProps<DefaultParams>>
}

export const ROUTES: Routes[] = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/create-group',
    component: CreateGroup
  },
  {
    path: '/group/:id',
    component: GroupPage
  },
  {
    path: '/group/:id/edit',
    component: EditGroup
  },
  {
    path: '/group/:id/balance',
    component: Balance
  }
]
