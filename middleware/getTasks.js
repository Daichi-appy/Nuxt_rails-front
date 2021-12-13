export default async ({ store, $axios }) => {
    const id = store.state.current.project.id
    await $axios.$get('/api/v1/tasks', { 
        params: { 
          project_id: id
        } 
      }
    ).then(response => store.dispatch('getTasks', response))
    // console.log(id)
  }
