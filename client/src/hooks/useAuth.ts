import useUserStore from '../stores/userStore'

const useAuth = () => {
  const user = useUserStore((state) => state.user)
}
