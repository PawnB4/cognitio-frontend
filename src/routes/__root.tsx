import { SignupUserResponse } from '@/api/types';
import { QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'

interface MyRouterContext {
  queryClient: QueryClient;
  user: SignupUserResponse | null
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <main className='min-h-screen flex flex-col '>
        <Outlet />
      </main>
    )
  }
})