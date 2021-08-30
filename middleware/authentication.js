
export default function ({ redirect, store }) {
  if (!store.getters.isLoggedIn) {
    return redirect('login')
  }
}