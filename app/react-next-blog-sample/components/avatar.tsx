type Props = {
  name: string
  picture: string
}

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img src={picture}
	   className="w-24 h-24
	       rounded-full mr-4"
	   alt={name} />
      <div className="text-2xl font-bold">{name}</div>
    </div>
  )
}

export default Avatar
