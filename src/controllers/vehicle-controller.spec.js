import { VehicleRepository } from "../models/vehicle-repository.js";
import { getAllVehicles } from "./vehicle-controller.js";

jest.mock("../models/vehicle-repository.js");

const mockRequest = () => ({});
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("getAllVehicles", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Return status code 200 and data", async () => {
    const vehicle = [
      {
        id: 2,
        brand: "Porsche",
        model: "Cayenne",
        year: 2024,
        km: 211,
      },
    ];

    const mockRead = jest.fn().mockResolvedValue(vehicle);

    // Faz com que toda nova instância de VehicleRepository retorne este mock
    VehicleRepository.mockImplementation(() => ({
      read: mockRead,
    }));

    const req = mockRequest();
    const res = mockResponse();

    await getAllVehicles(req, res);

    expect(mockRead).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(vehicle);
  });
});
