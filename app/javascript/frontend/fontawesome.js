import { library, dom } from '@fortawesome/fontawesome-svg-core'

import { 
  faFacebook,
  faGithub,
  faGoogle
 } from '@fortawesome/free-brands-svg-icons'

import { 
  faSearch,
  faChevronLeft,
  faPencilAlt,
  faHeart,
  faCloud,
  faCog,
  faThumbtack,
  faChevronDown,
  faAngleDown,
  faExpandArrowsAlt,
  faEye,
 } from '@fortawesome/free-solid-svg-icons'

library.add(
  faSearch,
  faChevronLeft,
  faPencilAlt,
  faHeart,
  faCloud,
  faCog,
  faThumbtack,
  faChevronDown,
  faAngleDown,
  faExpandArrowsAlt,
  faEye,
  faFacebook,
  faGithub,
  faGoogle
  )
  
dom.watch()