const { validateWebhookResponse } = require('./validate-webhook-response');

describe('validateWebhookResponse', () => {
  describe('Happy Cases', () => {
    it('should validate a positive response without details', () => {
      const [result] = validateWebhookResponse({
        success: true,
      });
      expect(result).toBe(true);
    });

    it('should validate a positive response with reschedule', () => {
      const [result] = validateWebhookResponse({
        success: true,
        schedule: {
          method: 'delay',
          value: '+1s',
        },
      });
      expect(result).toBe(true);
    });

    it('should validate a positive response with a payload', () => {
      const [result] = validateWebhookResponse({
        success: true,
        payload: {
          whatever: 'prop',
          is: 'accepted',
        },
      });
      expect(result).toBe(true);
    });

    it('should validate a positive response with logs', () => {
      const [result] = validateWebhookResponse({
        success: true,
        logs: [{ message: 'fooo' }],
      });
      expect(result).toBe(true);
    });

    it('should validate a negative response with mandatory logs', () => {
      const [result] = validateWebhookResponse({
        success: false,
        logs: [{ message: 'fooo' }],
      });
      expect(result).toBe(true);
    });
  });

  describe('Failing cases', () => {
    it('should fail with text response', () => {
      const [result, errors] = validateWebhookResponse('+ok');
      expect(result).toBe(false);
      expect(errors).toHaveLength(1);
      expect(errors[0].keyword).toBe('type');
    });

    it('should fail with negative response, and no logs keyword', () => {
      const [result, errors] = validateWebhookResponse({
        success: false,
      });
      expect(result).toBe(false);
      expect(errors).toHaveLength(1);
      expect(errors[0].keyword).toBe('required');
    });

    it('should fail with negative response, and empty logs array', () => {
      const [result, errors] = validateWebhookResponse({
        success: false,
        logs: [],
      });
      expect(result).toBe(false);
      expect(errors).toHaveLength(1);
      expect(errors[0].keyword).toBe('minItems');
    });
  });
});
