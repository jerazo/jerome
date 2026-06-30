import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import {
  Button,
  ButtonAnchor,
  ButtonLink,
  Container,
  CopyLinkButton,
  Gutter,
  LogoMark,
  NavHashLink,
  PortfolioImage,
  SkipToContent,
  Tag,
  TruncatedText,
} from '@/components/atomic'
import type {
  IButtonAnchorProps,
  IButtonAtomProps,
  IButtonLinkProps,
  IContainerProps,
  ICopyLinkButtonProps,
  IGutterProps,
  IImageAltProps,
  ILogoMarkProps,
  INavHashLinkProps,
  ITagProps,
  ITruncatedTextProps,
} from '@/components/atomic'

function withRouter(ui: ReactElement) {
  return <MemoryRouter>{ui}</MemoryRouter>
}

describe('atomic component type safety', () => {
  it('renders PortfolioImage with minimal IImageAltProps', () => {
    const props: IImageAltProps = { src: '/test.png', alt: 'Test image' }
    const { container } = render(<PortfolioImage {...props} />)
    expect(container.querySelector('img')).toBeTruthy()
  })

  it('renders CopyLinkButton with minimal ICopyLinkButtonProps', () => {
    const props: ICopyLinkButtonProps = { url: 'https://example.com/project' }
    render(<CopyLinkButton {...props} />)
    expect(screen.getByRole('button', { name: /copy link/i })).toBeTruthy()
  })

  it('renders NavHashLink with minimal INavHashLinkProps', () => {
    const props: INavHashLinkProps = { to: '/#work', children: 'Work' }
    render(withRouter(<NavHashLink {...props} />))
    expect(screen.getByRole('link', { name: 'Work' })).toBeTruthy()
  })

  it('renders Button with minimal IButtonAtomProps', () => {
    const props: IButtonAtomProps = { children: 'Submit' }
    render(<Button {...props} />)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeTruthy()
  })

  it('renders ButtonLink with minimal IButtonLinkProps', () => {
    const props: IButtonLinkProps = { to: '/showcase', children: 'Showcase' }
    render(withRouter(<ButtonLink {...props} />))
    expect(screen.getByRole('link', { name: 'Showcase' })).toBeTruthy()
  })

  it('renders ButtonAnchor with minimal IButtonAnchorProps', () => {
    const props: IButtonAnchorProps = { href: 'https://example.com', children: 'External' }
    render(<ButtonAnchor {...props} />)
    expect(screen.getByRole('link', { name: 'External' })).toBeTruthy()
  })

  it('renders Container with minimal IContainerProps', () => {
    const props: IContainerProps = { children: 'Content' }
    render(<Container {...props} />)
    expect(screen.getByText('Content')).toBeTruthy()
  })

  it('renders Gutter with minimal IGutterProps', () => {
    const props: IGutterProps = { children: 'Gutter content' }
    render(<Gutter {...props} />)
    expect(screen.getByText('Gutter content')).toBeTruthy()
  })

  it('renders LogoMark with minimal ILogoMarkProps', () => {
    const props: ILogoMarkProps = {}
    render(<LogoMark {...props} />)
    expect(screen.getByLabelText('JE logo mark')).toBeTruthy()
  })

  it('renders SkipToContent without props', () => {
    render(<SkipToContent />)
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeTruthy()
  })

  it('renders Tag with minimal ITagProps', () => {
    const props: ITagProps = { children: 'React' }
    render(<Tag {...props} />)
    expect(screen.getByText('React')).toBeTruthy()
  })

  it('renders TruncatedText with minimal ITruncatedTextProps', () => {
    const props: ITruncatedTextProps = { text: 'Long portfolio description' }
    render(<TruncatedText {...props} />)
    expect(screen.getByText('Long portfolio description')).toBeTruthy()
  })
})
