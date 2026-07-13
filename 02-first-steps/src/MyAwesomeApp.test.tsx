import { describe, test } from "vitest"
import { MyAwesomeApp } from "./MyAwesomeApp"
import { render, screen } from "@testing-library/react"

describe('MyAwesomeApp', () => {

  test('should render firstName and lastName', () => {
    render(<MyAwesomeApp />)
    screen.debug()
  })
})