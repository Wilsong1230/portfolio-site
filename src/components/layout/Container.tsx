interface Props {
  children: React.ReactNode
}

function Container({ children }: Props) {
  return (
    <div className="mx-auto max-w-5xl px-6">
      {children}
    </div>
  )
}

export default Container