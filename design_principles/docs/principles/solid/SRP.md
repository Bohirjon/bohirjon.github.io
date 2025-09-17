# Single Responsibility Principle (SRP)

The Single Responsibility Principle states that a class should have only one reason to change, meaning it should have only one job or responsibility.

## Key Points

- **Focus:** Each module, class, or function should handle a single part of the functionality.
- **Benefits:** Improves code maintainability, readability, and testability.
- **Problem:** Classes with multiple responsibilities are harder to maintain and test.

## Example: Order Processing

### ❌ Bad Code (Violates SRP)

```csharp
public class OrderProcessor
{
    public void ProcessOrder()
    {
        // Validate order
        Console.WriteLine("Validating order...");

        // Save order to database
        Console.WriteLine("Saving order...");

        // Charge payment
        Console.WriteLine("Charging payment...");

        // Send confirmation email
        Console.WriteLine("Sending email...");
    }
}
```

**Problems:**
- The class has three responsibilities: generating invoices, saving to database, and sending emails
- Changes to email logic would require modifying the invoice service
- Difficult to test individual responsibilities in isolation

### ✅ Good Code (Follows SRP)

```csharp
public class OrderValidator
{
    public void Validate()
    {
        Console.WriteLine("Validating order...");
    }
}

public class OrderRepository
{
    public void Save()
    {
        Console.WriteLine("Saving order...");
    }
}

public class PaymentService
{
    public void Charge()
    {
        Console.WriteLine("Charging payment...");
    }
}

public class EmailService
{
    public void SendConfirmation()
    {
        Console.WriteLine("Sending confirmation email...");
    }
}

public class OrderProcessor
{
    private readonly OrderValidator _validator;
    private readonly OrderRepository _repository;
    private readonly PaymentService _paymentService;
    private readonly EmailService _emailService;

    public OrderProcessor(
        OrderValidator validator,
        OrderRepository repository,
        PaymentService paymentService,
        EmailService emailService)
    {
        _validator = validator;
        _repository = repository;
        _paymentService = paymentService;
        _emailService = emailService;
    }

    public void ProcessOrder()
    {
        _validator.Validate();
        _repository.Save();
        _paymentService.Charge();
        _emailService.SendConfirmation();
    }
}

**Benefits:**
- Each class has a single, well-defined responsibility
- Changes to database logic only affect `OrderRepository`
- Each component can be tested independently
- Code is more modular and maintainable

## References

- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [SRP on refactoring.guru](https://refactoring.guru/design-patterns/single-responsibility-principle)