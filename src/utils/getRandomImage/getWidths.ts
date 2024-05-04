export function getWidths(resolution: string) {
  const resolutionAsArr = resolution.split('*');
  const width = resolutionAsArr[0];

  if (width === '7680') {
    return ['7680', '5210', '3840', '2560', '1920'];
  }

  if (width === '5210') {
    return ['5210', '3840', '2560', '1920'];
  }

  if (width === '3840') {
    return ['3840', '2560', '1920'];
  }

  if (width === '2560') {
    return ['2560', '1920'];
  }

  if (width === '1920') {
    return ['1920', '1600', '1280'];
  }

  if (width === '1600') {
    return ['1600', '1280'];
  }

  if (width === '1280') {
    return ['1280', '640'];
  }

  if (width === '640') {
    return ['640', '100'];
  }

  return ['1920', '1600', '1280'];
}
