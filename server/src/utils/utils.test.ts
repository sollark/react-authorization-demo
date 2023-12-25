import { utilService } from './utils'

describe('utilService', () => {
  describe('getRandomInt', () => {
    it('should return a random integer between min and max (inclusive)', () => {
      const min = 1
      const max = 10
      const result = utilService.getRandomInt(min, max)
      expect(result).toBeGreaterThanOrEqual(min)
      expect(result).toBeLessThanOrEqual(max)
      expect(Number.isInteger(result)).toBe(true)
    })
  })

  describe('isNumeric', () => {
    it('should return true for numeric inputs', () => {
      expect(utilService.isNumeric('123')).toBe(true),
        expect(utilService.isNumeric('-456')).toBe(true),
        expect(utilService.isNumeric('0')).toBe(true),
        expect(utilService.isNumeric('3.14')).toBe(true)
    })

    it('should return false for non-numeric inputs', () => {
      expect(utilService.isNumeric('abc')).toBe(false),
        expect(utilService.isNumeric('12a34')).toBe(false),
        expect(utilService.isNumeric('')).toBe(false)
    })
  })

  describe('convertToNumber', () => {
    it('should return the numeric value for valid numeric inputs', () => {
      expect(utilService.convertToNumber('123')).toBe(123)
      expect(utilService.convertToNumber('-456')).toBe(-456)
      expect(utilService.convertToNumber('0')).toBe(0)
      expect(utilService.convertToNumber('3.14')).toBe(3.14)
    })

    it('should return null for non-numeric inputs', () => {
      expect(utilService.convertToNumber('abc')).toBeNull()
      expect(utilService.convertToNumber('12a34')).toBeNull()
      expect(utilService.convertToNumber('')).toBeNull()
    })
  })
})
