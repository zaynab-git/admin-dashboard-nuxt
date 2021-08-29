export default function ({ store, redirect }) {
    if (!store.state.status === 'success') {
      return redirect('login')
    }
  }