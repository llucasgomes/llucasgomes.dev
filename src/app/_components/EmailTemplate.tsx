interface EmailTemplateProps {
  name: string
  message: string
  email: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  message,
  email,
}) => (
  <div className="bg-slate-500">
    <h1 className="text-4xl font-bold">Ola eu sou , {name}!</h1>
    <p>{message}</p>
    <p> Meu Email para contato é {email}</p>
  </div>
)
