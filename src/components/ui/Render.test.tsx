import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { Render } from './Render'

describe('<Render />', () => {
  it('renders children when "if" is true', () => {
    render(
      <Render if={true}>
        <div>Active Content</div>
      </Render>,
    )

    expect(screen.getByText('Active Content')).toBeInTheDocument()
  })

  it('renders nothing when "if" is false without fallback', () => {
    const { container } = render(
      <Render if={false}>
        <div>Active Content</div>
      </Render>,
    )

    expect(container).toBeEmptyDOMElement()
    expect(screen.queryByText('Active Content')).not.toBeInTheDocument()
  })

  it('renders correctly with separate if true and if false blocks', () => {
    const isReady = false

    render(
      <>
        <Render if={isReady}>
          <div>Ready</div>
        </Render>
        <Render if={!isReady}>
          <div>Not Ready</div>
        </Render>
      </>,
    )

    expect(screen.queryByText('Ready')).not.toBeInTheDocument()
    expect(screen.getByText('Not Ready')).toBeInTheDocument()
  })

  it('renders children when "ifNot" condition is false', () => {
    render(
      <Render ifNot={false}>
        <div>Shown when falsy</div>
      </Render>,
    )

    expect(screen.getByText('Shown when falsy')).toBeInTheDocument()
  })

  it('does not render children when "ifNot" condition is true', () => {
    render(
      <Render ifNot={true}>
        <div>Hidden when truthy</div>
      </Render>,
    )

    expect(screen.queryByText('Hidden when truthy')).not.toBeInTheDocument()
  })

  it('passes unwrapped truthy value to render callback function', () => {
    const sample = { title: 'Hello World' }

    render(<Render if={sample}>{(data) => <div>{data.title}</div>}</Render>)

    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('renders "then" when "if" is true and "else" when false', () => {
    const { rerender } = render(
      <Render if={true} then={<div>Then Content</div>} else={<div>Else Content</div>} />,
    )

    expect(screen.getByText('Then Content')).toBeInTheDocument()
    expect(screen.queryByText('Else Content')).not.toBeInTheDocument()

    rerender(<Render if={false} then={<div>Then Content</div>} else={<div>Else Content</div>} />)

    expect(screen.getByText('Else Content')).toBeInTheDocument()
    expect(screen.queryByText('Then Content')).not.toBeInTheDocument()
  })

  it('evaluates functions lazily and only calls the active branch', () => {
    const thenFn = vi.fn(() => <div>Lazy Then</div>)
    const elseFn = vi.fn(() => <div>Lazy Else</div>)

    const { rerender } = render(<Render if={true} then={thenFn} else={elseFn} />)

    expect(thenFn).toHaveBeenCalledTimes(1)
    expect(elseFn).not.toHaveBeenCalled()

    rerender(<Render if={false} then={thenFn} else={elseFn} />)

    expect(thenFn).toHaveBeenCalledTimes(1)
    expect(elseFn).toHaveBeenCalledTimes(1)
  })
})
