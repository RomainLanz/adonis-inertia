import * as sinkStatic from '@adonisjs/sink'

/**
 * Prompt choices for the frontend framework selection
 */
const FRONT_PROMPT_CHOICES = [
  {
    name: 'vue' as const,
    message: 'Vue',
    hint: ' (Use VueJS for the frontend)',
  },
  {
    name: 'react' as const,
    message: 'React',
    hint: ' (Use ReactJS for the frontend)',
  },
  {
    name: 'svelte' as const,
    message: 'Svelte',
    hint: ' (Use Svelte for the frontend)',
  },
  {
    name: 'none' as const,
    message: 'None',
    hint: '',
  },
]

function getFrontendFramework (sink: typeof sinkStatic) {
  return sink.getPrompt().choice('Which frontend framework you want to use?', FRONT_PROMPT_CHOICES)
}

/**
 * Instructions to be executed when setting up the package.
 */
export default async function instructions (
  sink: typeof sinkStatic,
) {
  const pkg = new sink.files.PackageJsonFile('.')
  pkg.install('@inertiajs/inertia')

  const frontendFramework = await getFrontendFramework(sink)

  switch (frontendFramework) {
    case 'vue': {
      pkg.install('@inertiajs/inertia-vue')
      break
    }
    case 'react': {
      pkg.install('@inertiajs/inertia-react')
      break
    }
    case 'svelte': {
      pkg.install('@inertiajs/inertia-svelte')
      break
    }
    default: {}
  }

  sink.logger.info(`Installing packages: ${pkg.getInstalls().list.join(', ')}`)
  await pkg.commitAsync()
  sink.logger.success('Packages installed!')
}

instructions(
  sinkStatic,
).catch(console.log)
