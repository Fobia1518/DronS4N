describe('Call api', () => {
    const mockUrl = '/delivery';
    const mockdeliverys = [{
        "deliverys": [
            {
                "id": 0,
                "delivery": "DAIDIDA"
            },
            {
                "id": 1,
                "delivery": "ADIAIIA"
            },
            {
                "id": 2,
                "delivery": "DIDAIDD"
            }
        ]
    }];
    const readDeliveryFile = jest.fn(url => mockdeliverys);
    it('returns deliverys from an api call', () => {
      expect(readDeliveryFile(mockUrl)).toBe(mockdeliverys);
      console.log(readDeliveryFile.mock.results[0].value[0]);
    });
    it('return if the api was called', () => {
        expect(readDeliveryFile).toHaveBeenCalled();
      });
    it('called function readDeliveryFile with a mockUrl', () => {
      expect(readDeliveryFile).toHaveBeenCalledWith(mockUrl);
    });
  });