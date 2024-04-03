import { defineComponent } from 'vue'
import { describe, it, expect } from 'vitest'
import App from '../../src/runtime/components/App.vue'
import Tooltip, { type TooltipProps } from '../../src/runtime/components/Tooltip.vue'
import ComponentRender from '../component-render'

const TooltipWrapper = defineComponent({
  components: {
    UApp: App,
    UTooltip: Tooltip
  },
  inheritAttrs: false,
  template: '<UApp><UTooltip v-bind="$attrs"><slot /></UTooltip></UApp>'
})

describe('Tooltip', () => {
  it.each([
    ['with text', { props: { text: 'Tooltip', open: true, portal: false } }],
    ['with arrow', { props: { text: 'Tooltip', arrow: true, open: true, portal: false } }],
    ['with shortcuts', { props: { text: 'Tooltip', shortcuts: ['⌘', 'K'], open: true, portal: false } }]
  ])('renders %s correctly', async (nameOrHtml: string, options: { props?: TooltipProps, slots?: any }) => {
    const html = await ComponentRender(nameOrHtml, options, TooltipWrapper)
    expect(html).toMatchSnapshot()
  })
})