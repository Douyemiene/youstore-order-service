import { Request, Response } from "express";

export abstract class BaseController<T> {
  // or even private{}

  protected abstract execute(req: Request, res: Response): Promise<T>;

  public async GenericExecute(req: Request, res: Response) {
    try {
      await this.execute(req, res);
    } catch (err) {
      this.fail(res, "An unexpected error occurred");
    }
  }

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public fail(res: Response, error: Error | string) {
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
