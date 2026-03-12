import { profile } from "../data/profile"
import { FaGithub, FaLinkedin, FaFileAlt,  } from 'react-icons/fa'

function Contact() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-semibold text-white">Contact</h2>

        <div className="mt-8 flex flex-wrap gap-6 text-zinc-300">
          <a href={profile.links.github} target="_blank">GitHub
            <FaGithub className="inline ml-2" />
          </a>
          <a href={profile.links.linkedin} target="_blank">LinkedIn
            <FaLinkedin className="inline ml-2" />
          </a>
          <a href={profile.links.resume} target="_blank">Resume
            <FaFileAlt className="inline ml-2" />
          </a>
          <a href="mailto:your@email.com">Email</a>
        </div>
      </div>
    </section>
  )
}

export default Contact